import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, filter, map } from 'rxjs/operators';

import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import { fromLonLat, transform } from 'ol/proj';
import { OSM } from 'ol/source';
import { Fill, Icon, Stroke, Style } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import View from 'ol/View';

import { HouseType } from '../shared/model/houseType.model';
import { MonthEnums } from '../shared/model/months.model';
import { ParticipateInput } from '../shared/model/participateInput.model';
import { PeliasService, PredictService, LoaderService } from '../service';

const FormValidator: ValidatorFn = (fg: FormGroup) => {
    const groundSurface = fg.get('groundSurface').value;
    const groundSurfaceCarrez = fg.get('groundSurfaceCarrez').value;
    const groundSurfaceTotal = fg.get('groundSurfaceTotal').value;
    const type = fg.get('type').value;
    const roomNumber = fg.get('roomNumber').value;
    const year = fg.get('year').value;
    const month = fg.get('month').value;
    const price = fg.get('price').value;


    return groundSurface !== null &&
        groundSurfaceCarrez !== null &&
        groundSurfaceTotal !== null &&
        type !== null &&
        roomNumber !== null &&
        year !== null &&
        month !== null &&
        price !== null &&
        groundSurface >= groundSurfaceCarrez &&
        groundSurfaceTotal >= groundSurface &&
        groundSurface > 0 &&
        groundSurfaceCarrez > 0 &&
        groundSurfaceTotal > 0 &&
        groundSurfaceTotal >= groundSurfaceCarrez &&
        roomNumber > 0 &&
        year >= 2005 &&
        year <= 2018 &&
        month >= 1 &&
        month <= 12 &&
        price > 0 ? null : { range: true };
};

@Component({
    selector: 'app-participate',
    templateUrl: './participate.component.html',
    styleUrls: ['participate.scss']
})

export class ParticipateComponent implements OnInit, AfterViewInit {

    // Nantes Longitude and latitude
    longitude = -1.553621;
    latitude = 47.218371;

    coordinatesChange = new Subject<number[]>();

    // Open Street Map
    map: any;

    houseTypeList = Object.keys(HouseType);
    months = MonthEnums;
    monthsKeys = Object.keys(MonthEnums).filter(Number);

    // User input
    userInput = new ParticipateInput();
    value = 0;

    location: string;

    search: any;

    loading = false;

    form: FormGroup;

    constructor(
        private router: Router,
        private peliasService: PeliasService,
        private predictService: PredictService,
        private translateService: TranslateService,
        private loaderService: LoaderService,
        private formBuilder: FormBuilder
    ) {
        this.loaderService.isLoading.subscribe((v) => {
            this.loading = v;
        });
    }

    validGroundSurfaceTotal() {
        const groundSurfaceTotal = this.form.get('groundSurfaceTotal').value;
        const groundSurface = this.form.get('groundSurface').value;
        const groundSurfaceCarrez = this.form.get('groundSurfaceCarrez').value;

        return groundSurfaceTotal !== null &&
            groundSurface !== null &&
            groundSurfaceTotal >= groundSurface &&
            groundSurfaceCarrez !== null &&
            groundSurface > 0 &&
            groundSurfaceCarrez > 0 &&
            groundSurfaceTotal > 0 &&
            groundSurfaceTotal >= groundSurfaceCarrez;

    }

    validGroundSurface() {
        const groundSurface = this.form.get('groundSurface').value;
        const groundSurfaceCarrez = this.form.get('groundSurfaceCarrez').value;

        return groundSurface !== null &&
            groundSurfaceCarrez !== null &&
            groundSurface > 0 &&
            groundSurfaceCarrez > 0 &&
            groundSurface >= groundSurfaceCarrez;
    }

    validYear() {
        const year = this.form.get('year').value;

        return year >= 2005 &&
            year <= 2018 &&
            year <= new Date().getFullYear();
    }

    validPrice() {
        const price = this.form.get('price').value;

        return price !== null &&
            price > 0;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            type: [this.userInput.type, [Validators.required]],
            groundSurface: [this.userInput.groundSurface, [Validators.required]],
            groundSurfaceCarrez: [this.userInput.groundSurfaceCarrez, [Validators.required]],
            groundSurfaceTotal: [this.userInput.groundSurfaceTotal, [Validators.required]],
            roomNumber: [this.userInput.roomNumber, [Validators.required]],
            month: [this.userInput.month, [Validators.required]],
            year: [this.userInput.year, [Validators.required]],
            price: [this.userInput.price, [Validators.required]]
        }, { validator: FormValidator });

        const temp = new Point(fromLonLat([this.longitude, this.latitude]));

        const wmsLayer = new TileLayer({
            source: new OSM()
        });

        const view = new View({
            center: fromLonLat([this.longitude, this.latitude]),
            zoom: 16
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

        this.map.setView(
            new View({
                center: fromLonLat([this.longitude, this.latitude]),
                minZoom: 11,
                zoom: 11,
                extent: fromLonLat([-1.856722, 47.105736]).concat(fromLonLat([-1.368222, 47.318067])),
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
        this.userInput.groundSurface = this.form.get('groundSurface').value;
        this.userInput.groundSurfaceCarrez = this.form.get('groundSurfaceCarrez').value;
        this.userInput.groundSurfaceTotal = this.form.get('groundSurfaceTotal').value;
        this.userInput.roomNumber = this.form.get('roomNumber').value;
        this.userInput.type = this.form.get('type').value;
        this.userInput.year = this.form.get('year').value;
        this.userInput.month = +this.form.get('month').value;
        this.userInput.price = this.form.get('price').value;

        this.predictService.participate(this.userInput).subscribe(res => {
            this.router.navigate(['/result'], { state: { userInput: this.userInput, price: res.price, type: res.type } });
        });
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
        this.form.get('roomNumber').setValue(this.form.get('roomNumber').value + 1);
    }

    decreaseRoomNumber() {
        if (this.userInput.roomNumber > 1) {
            this.form.get('roomNumber').setValue(this.form.get('roomNumber').value - 1);
        }
    }
}
