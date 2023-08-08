import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import DialogMapFilter from '../models/DialogMapFilter';
import { GMap } from 'primereact/gmap';
import { loadGoogleMaps, removeGoogleMaps } from '../../../GoogleMaps';

interface Props {
  title: string;
  filter: DialogMapFilter;
  footer: any;
}

const DialogMap: React.FC<Props> = ({ title, filter, footer }) => {
  useEffect(() => {
    loadGoogleMaps(() => {
      filter.setGoogleMapsReady(true);
    });

    return () => {
      removeGoogleMaps();
    };
  }, []);

  const onMapClick = (map: any) => {
    if (filter.permitirMarcar) {
      filter.setLatitude(map.latLng.lat());
      filter.setLogintude(map.latLng.lng());
      filter.setOverlays([
        new google.maps.Marker({
          position: map.latLng,
        }),
      ]);
    }
  };

  const onMapReady = () => {
    // console.log('onMapReady');
  };
  const onOverlayClick = () => {
    // console.log('onOverlayClick');
  };

  const handleDragEnd = () => {
    // console.log('handleDragEnd');
  };

  return (
    <Dialog
      className="custom-dialog"
      header={title}
      visible={filter.isVisible}
      modal
      onHide={() => filter.setIsVisible(false)}
      style={{ width: '80%', minHeight: '80%' }}
      footer={footer}
    >
      {filter.googleMapsReady && (
        <GMap
          style={{ width: '100%', minHeight: '500px' }}
          overlays={filter.overlays}
          options={filter.options}
          ref={filter.gmap}
          onMapReady={onMapReady}
          onMapClick={onMapClick}
          onOverlayClick={onOverlayClick}
          onOverlayDragEnd={handleDragEnd}
        />
      )}
    </Dialog>
  );
};

export default DialogMap;
