import { IDrugModel } from 'src/app/pharmacy/models/DrugSearchModel';
import { Constants } from '../constnts';
import { E_drug_PriceType, E_drug_UnitType } from '../enums/enums';

export class DrugUtility{
    static getPriceType(type:E_drug_PriceType){
        return type==E_drug_PriceType.newP ?'سعر جديد':'سعر قديم';
    }
    static getUnitType(unit:E_drug_UnitType){
        switch (unit) {
            case E_drug_UnitType.capsole:
                return 'كبسول'
        case E_drug_UnitType.elba:
            return 'علبة'
        case E_drug_UnitType.cartoon:
            return 'كرتونة'
        case E_drug_UnitType.shareet:
            return 'شريط'
        case E_drug_UnitType.unit:
            return 'وحدة'
        default: return 'وحدة'
        }
    }
    static getDrugStateFormate(model:Partial<IDrugModel>){
        const unitTypeName=Constants.lists.drugsUnits.find(v=>v.value==model.unitType)?.title||'';
        return `يوجد لدى عدد ${model.quantity||''} ${unitTypeName} من  ${model.name||''} - ${model.type||''} - بسعر ${model.price||''} جنية لل/${unitTypeName}`
    }
}