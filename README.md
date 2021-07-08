# MyApi
Enable EU Countries & Cities with latitude and longitude in WordPress API 

## instalation:
1- Download latest release from https://github.com/akbarijedi/my_api/releases

2- Go to your wordpress website admin panel and login

3- Go to plugin installation and upload the zip file

4- Activate the plugin

5- You must see the "MyAPI" admin nemu

6- Go to Setting -> Permalink -> select one of them (Recommended : Month and name)


## Versions

### Version 1.1.1 🥇
- Add description and documentation in admin panel
- Add Permalinks enabling attention to work the API
- Add Link to github my-api Release

### Version 1.1.0 :
- Add Admin panel menu
- Ability to add, update or delete cities from a country
1- in order to get country list go to :

```
Your_WebSite_URL/wp-json/get/countries 
```

2- in order to retrieve cities of a country :
```
Your_WebSite_URL/wp-json/get/cities/country=Germany   <= Your Country name
```
### version 1.0.0 :
- Create database for EU countries and citied with latitude an longitude.
- Create route to :
```
Your_WebSite_URL/wp-json/get/countries 
```
Get Countries like:
```
{
country_name: "Austria"
},
{
country_name: "Belgium"
},
{
country_name: "Bulgaria"
},
{
country_name: "Croatia"
},
{
country_name: "Cyprus"
},
{
country_name: "Czechia"
},
{
country_name: "Denmark"
},
{
country_name: "Estonia"
},
{
country_name: "Finland"
},
{
country_name: "Germany"
},...
```
- Get Cities route like:
```
Your_WebSite_URL/wp-json/get/cities/country=Germany
```
Result like :
```
[
{
city_name: "Berlin",
lat: "52.5218",
lng: "13.4015"
},
{
city_name: "Stuttgart",
lat: "48.78",
lng: "9.2"
},
{
city_name: "Mannheim",
lat: "49.5004",
lng: "8.47"
},
{
city_name: "Hamburg",
lat: "53.55",
lng: "10"
},
{
city_name: "Essen",
lat: "51.45",
lng: "7.0166"
},
{
city_name: "Duisburg",
lat: "51.43",
lng: "6.75"
},
```
