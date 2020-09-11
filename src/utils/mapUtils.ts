interface SmoothZoomProps {
  mapElement: google.maps.Map;
  zoom: number;
  actualMapZoom: number;
  zoomType: 'zoomIn' | 'zoomOut';
}

const smoothZoom = ({
  mapElement,
  zoom,
  actualMapZoom,
  zoomType,
}: SmoothZoomProps): void => {
  if (zoomType === 'zoomIn') {
    if (actualMapZoom >= zoom) {
      return;
    }

    const zoomEvent = window.google.maps.event.addListener(
      mapElement,
      'zoom_changed',
      () => {
        window.google.maps.event.removeListener(zoomEvent);

        smoothZoom({
          mapElement,
          zoom,
          actualMapZoom: actualMapZoom + 1,
          zoomType: 'zoomIn',
        });
      },
    );

    setTimeout(() => mapElement.setZoom(actualMapZoom), 80);
  } else {
    if (actualMapZoom <= zoom) {
      return;
    }

    const zoomEvent = window.google.maps.event.addListener(
      mapElement,
      'zoom_changed',
      () => {
        window.google.maps.event.removeListener(zoomEvent);

        smoothZoom({
          mapElement,
          zoom,
          actualMapZoom: actualMapZoom - 1,
          zoomType: 'zoomOut',
        });
      },
    );

    setTimeout(() => mapElement.setZoom(actualMapZoom), 80);
  }
};

export { smoothZoom };
