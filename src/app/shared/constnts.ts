import { E_drug_PriceType, E_drug_ConsumeType, E_drug_UnitType } from "./enums/enums";

export class Constants{
   static phoneRegexPattern=/^01(1|2|5|0|7)\d{8,8}$/;
   static numberPattern=/^[0-9]*/;
   static floatNumberPatter=/\d{0,2}(\.\d{0,2}){0,1}/;
   static get lists(){
      return {
       drugsPriceTypes:Lists.drugsPriceTypes,
       drugsConsumeTypes:Lists.drugsConsumeTypes,
       drugsUnits:Lists.drugsUnits,
       drugsTypes:Lists.drugsTypes
      }
   } 
   static activePags={
      drugsPage:'drugs',
      pharmacy_Stores:'ph_stores',
      pharmacy_DrugsRequests:'ph_drug_requests',
      storeManage:'store_manage'
   }
   static drugsTemplateFilePath="/assets/content/drugsTemplate.csv";
}
 class Lists{
   public static  drugsPriceTypes=[
      {title:'سعر جديد',value:E_drug_PriceType.newP},
      {title:'سعر قديم',value:E_drug_PriceType.oldP}
   ]
   public static drugsConsumeTypes=[
      {title:'استبدالجمهور مع جمهور',value:E_drug_ConsumeType.exchanging},
      {title:'حرق/بيع بدون استبدال',value:E_drug_ConsumeType.burning}
   ]
   public static drugsUnits=[
      {title:"شريط",value:E_drug_UnitType.shareet},
      {title:"علبة",value:E_drug_UnitType.elba},
      {title:"كرتونة",value:E_drug_UnitType.cartoon},
      {title:"كبسولة",value:E_drug_UnitType.capsole},
      {title:"وحدة/صنف أخر",value:E_drug_UnitType.unit},
   ]
   public static drugsTypes=[
         {title:"لاشىء من هذا",value:"0"},
         {title:"اقراص",value: "اقراص"},
         {title:"شراب",value:"شراب"},
         {title:"حقن",value:"حقن"},
         {title:"نقط",value:"نقط",},
         {title:"قطرة",value:"قطرة",},
         {title:"بخاخ",value:"بخاخ",},
         {title:"دهان",value:"دهان",},
         {title:"كبسول",value:"كبسول",},
         {title:"كريم",value:"كريم",},
         {title:"بودرة",value:"بودرة",},
         {title:"فوار",value:"فوار",},
         {title:"مسلتزمات تغذية",value:"مسلتزمات تغذية",},
         {title:"مسلتزمات شعر",value:"مسلتزمات شعر",},
         {title:"مسلتزمات تزيين",value:"مسلتزمات تزيين"},
   ]
}