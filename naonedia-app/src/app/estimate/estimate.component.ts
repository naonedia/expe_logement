import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, filter, map } from 'rxjs/operators';

import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import { fromLonLat, transform, get } from 'ol/proj';
import { OSM } from 'ol/source';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import View from 'ol/View';

import { HouseType } from '../shared/model/houseType.model';
import { EstimateInput } from '../shared/model/estimateInput.model';
import { PeliasService, PredictService, LoaderService } from '../service';

@Component({
    selector: 'app-estimate',
    templateUrl: './estimate.component.html',
    styleUrls: ['estimate.scss']
})

export class EstimateComponent implements OnInit, AfterViewInit {

    // Nantes Longitude and latitude
    longitude = -1.553621;
    latitude = 47.218371;

    coordinatesChange = new Subject<number[]>();

    // Open Street Map
    map: any;

    houseTypeList = Object.keys(HouseType);

    // User input
    userInput = new EstimateInput();
    value = 0;

    location: string;

    search: any;

    loading= false;

    constructor(
        private router: Router,
        private peliasService: PeliasService,
        private predictService: PredictService,
        private translateService: TranslateService,
        private loaderService: LoaderService
    ) { 
        this.loaderService.isLoading.subscribe((v) => {
            this.loading = v;
        });
    }

    ngOnInit() {
        const temp = new Point(fromLonLat([this.longitude, this.latitude]));

        const wmsLayer = new TileLayer({
            source: new OSM()
        });

        const view = new View({
            center: fromLonLat([this.longitude, this.latitude]),
            zoom: 16,
        });

        const iconFeature = new Feature({
            geometry: temp
        });

        const iconStyle = new Style({
            image: new Icon(({
                anchor: [0.5, 1],
                scale: 3,
                anchorXUnits: 'fraction' as any,
                anchorYUnits: 'fraction' as any,
                opacity: 0.75,
                src: './assets/images/marker.svg'
            }))
        });

        iconFeature.setStyle(iconStyle);

        const vectorNantesLayer = new LayerVector({
            source: new SourceVector({
                format: new GeoJSON(),
                url: './assets/maps/metropolis.geojson'
            }),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(0,170,193,0.3)'
                }),
                stroke: new Stroke({
                    color: 'white'
                })
            })
        });

        const vectorNantesCentreVilleLayer = new LayerVector({
            source: new SourceVector({
                format: new GeoJSON(),
                url: './assets/maps/town-center.geojson'
            }),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(24,114,217,0.3)'
                }),
                stroke: new Stroke({
                    color: 'white'
                })
            })
        });

        const vectorSource = new SourceVector({
            features: [iconFeature]
        });

        const vectorLayer = new LayerVector({
            source: vectorSource
        });

        this.map = new Map({
            layers: [wmsLayer, vectorNantesLayer, vectorNantesCentreVilleLayer, vectorLayer],
            target: 'map',
            view
        });

        const myExtent = this.map.getView().calculateExtent(this.map.getSize());
        this.map.setView(
            new View({
                center: fromLonLat([this.longitude, this.latitude]),
                minZoom: 11,
                zoom: 11,
                extent: myExtent,
            })
        );

        this.coordinatesChange.subscribe(res => {
            temp.setCoordinates(fromLonLat(res));
            this.userInput.longitude = res[0];
            this.userInput.latitude = res[1];
        });

        this.map.on('singleclick', (evt) => {
            if (
                vectorNantesLayer.getSource().getFeaturesAtCoordinate(evt.coordinate).length !== 0 ||
                vectorNantesCentreVilleLayer.getSource().getFeaturesAtCoordinate(evt.coordinate).length !== 0
            ) {
                this.coordinatesChange.next(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
            }
        });

        this.search = (text: Observable<string>) =>
            text.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                filter(searchText => searchText !== ''),
                switchMap((searchText) => this.peliasService.getAutoComplete(searchText)),
                map(response => response.filter(value =>
                    vectorNantesLayer.getSource().getFeaturesAtCoordinate(fromLonLat(value.geometry.coordinates)).length !== 0 ||
                    vectorNantesCentreVilleLayer.getSource().getFeaturesAtCoordinate(fromLonLat(value.geometry.coordinates)).length !== 0
                ))
            );
    }

    ngAfterViewInit() {
        this.map.setTarget('map');
    }

    onSubmit() {
        this.predictService.estimate(this.userInput).subscribe(res => {
            this.router.navigate(['/result'], { state: { userInput: this.userInput, price: res.price, type: res.type } });
        })
    }

    /**
     * Used to format the result data from the lookup into the
     * display and list values. Maps objects into a string
     */
    resultFormatBandListValue = (value: any) => {
        return value.properties.name;
    }
    /**
     * Initially binds the string value and then after selecting
     * an item by checking either for string or key/value object.
     */
    inputFormatBandListValue = (value: any) => {
        if (value.properties.name) {
            this.coordinatesChange.next(value.geometry.coordinates);
            return value.properties.name;
        }
        return value;
    }

    increaseRoomNumber() {
        this.userInput.roomNumber += 1;
    }

    decreaseRoomNumber() {
        if (this.userInput.roomNumber > 0) {
            this.userInput.roomNumber -= 1;
        }
    }
}
