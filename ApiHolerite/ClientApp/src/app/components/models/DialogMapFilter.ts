import { useState, useRef } from 'react';

export default class DialogMapFilter {
  public isVisible: boolean;

  public setIsVisible: any;

  public googleMapsReady: boolean;

  public setGoogleMapsReady: any;

  public onhide: boolean;

  public setOnhide: any;

  public latitude: number | null;

  public setLatitude: any;

  public logintude: number | null;

  public setLogintude: any;

  public overlays: any[];

  public setOverlays: any;

  public options: { [key: string]: any };

  public setOptions: any;

  public gmap: any;

  public permitirMarcar: boolean;

  public setPermitirMarcar: any;

  public salvarLatLng: boolean;

  public setSalvarLatLng: any;

  public marker: google.maps.Marker | undefined;

  public setMarker: any;

  constructor() {
    this.gmap = useRef();
    [this.isVisible, this.setIsVisible] = useState<boolean>(false);
    [this.googleMapsReady, this.setGoogleMapsReady] = useState(false);
    [this.onhide, this.setOnhide] = useState<boolean>(true);
    [this.latitude, this.setLatitude] = useState<number | null>(null);
    [this.logintude, this.setLogintude] = useState<number | null>(null);
    [this.overlays, this.setOverlays] = useState<any[]>([]);
    // @ts-ignore
    [this.options, this.setOptions] = useState<{ [key: string]: any }>({
      center: { lat: -14.2400732, lng: -53.1805017 },
      zoom: 5,
    });
    [this.permitirMarcar, this.setPermitirMarcar] = useState(false);
    [this.marker, this.setMarker] = useState<google.maps.Marker | undefined>();
    [this.salvarLatLng, this.setSalvarLatLng] = useState<boolean>(false);
  }
}
