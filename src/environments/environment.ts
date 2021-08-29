// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl:"http://www.backend.fastdo.co/api",
  //apiUrl:"http://localhost:10/api",
  apiUrl:'https://localhost:5001/api',
  //techSupportChatHubUrl:"http://localhost:10/hub/techsupport",
  techSupportChatHubUrl:"https://localhost:5001/hub/techsupport",
  //techSupportChatHubUrl:"http://www.backend.fastdo.co/hub/techsupport"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
