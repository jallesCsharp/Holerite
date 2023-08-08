import DialogMapFilter from '../models/DialogMapFilter';

export default class GoogleService {
  constructor(private readonly filter: DialogMapFilter) {}

  public abrirMapaLatLog(lat: any, lng: any) {
    this.filter.setOverlays([
      new google.maps.Marker({
        position: { lat: lat, lng: lng },
      }),
    ]);
    this.filter.setOptions({
      center: { lat: lat, lng: lng },
      zoom: 15,
    });
    this.filter.setIsVisible(true);
  }

  public abrirMapaEm(address: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address,
      },
      (results, status) => {
        if (status === 'OK') {
          if (results) {
            this.filter.setOptions({
              center: results[0].geometry.location,
              zoom: 15,
            });
          }
        }
        this.filter.setIsVisible(true);
      },
    );
  }

  public buscarRota(localizacao?: google.maps.LatLng[]) {
    this.filter.setIsVisible(true);
    if (localizacao && localizacao?.length > 1) {
      const origem = localizacao.shift();
      const destino = localizacao.pop();

      const percurso: google.maps.DirectionsWaypoint[] = localizacao.map((a) => ({
        location: a,
        stopover: true,
      }));

      const service = new google.maps.DirectionsService();

      const directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
      });

      const request: google.maps.DirectionsRequest = {
        origin: origem!,
        destination: destino!,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: percurso,
      };

      service.route(request, (retorno) => {
        if (retorno && retorno?.routes.length > 0) {
          directionsDisplay.setMap(this.filter.gmap.current.map);
          const rotas = retorno?.routes[0].overview_path.map((a) => ({
            lat: a.lat(),
            lng: a.lng(),
          }));

          // tslint:disable-next-line:no-unused-expression
          new google.maps.Marker({
            position: rotas[0],
            map: this.filter.gmap.current.map,
          });

          // tslint:disable-next-line:no-unused-expression
          new google.maps.Marker({
            position: rotas[rotas.length - 1],
            map: this.filter.gmap.current.map,
          });

          this.filter.setOptions({
            center: { lat: rotas[0].lat, lng: rotas[0].lng },
            zoom: 12,
          });
          directionsDisplay.setDirections(retorno);
        }
      });
    } else if (localizacao && localizacao.length > 0) {
      this.filter.setOptions({
        center: localizacao[0],
        zoom: 12,
      });
      this.filter.setOverlays([
        new google.maps.Marker({
          position: localizacao[0],
        }),
      ]);
    }
  }
}
