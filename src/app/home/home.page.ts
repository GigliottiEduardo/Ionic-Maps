import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  Map!: GoogleMap;

  constructor() {}

  ionViewWillEnter() {
    this.createMap();
  }

  async createMap() {
    this.Map = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapsKey,
      config: {
        center: {
          lat: -22.489207,
          lng: -48.546470,
        },
        zoom: 1,
      },
    });
    this.buscarPosicao();
  }

  // vai buscar a posilçao de acordo com as coordenadas
  async buscarPosicao(){
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates);
    this.adicionarMarcador(coordinates);
    return coordinates;
  }
  // vai adicionar um marcador em cima do mapa de acordo com as coordenadas
  async adicionarMarcador(coordinates: Position){
      // Add a marker to the map
  const markerId = await this.Map.addMarker({
    coordinate: {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
  }

});

//vai dar zoom no mapa em cima das coordenadas
this.zoomNoMarcador(coordinates);
  }

  zoomNoMarcador(coordinates: Position){
    this.Map.setCamera({
      coordinate:{
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      }
    });
  }
}
