import * as moment from 'moment';
import { EstimateInput } from './estimateInput.model';

export class ParticipateInput extends EstimateInput {

    price = 0;
    year = moment().year();
    month = moment().month();
}
