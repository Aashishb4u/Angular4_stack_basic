export class AppConstant {
    //constant variables
    LogoImage = 'http://dev.recruitment.tudip.uk/assets/img/logomain.png';
}
export class Constants {
    FBERROR = 'Facebook has denied authentication, please try again';
    FBALERT = 'Cancelled by user, please try again';
}

//for http constant
interface HttpConfig{
    baseUrl: string;
    apiKey: string;
}

export const HTTP_CONFIG: HttpConfig = {
    // base url local
     baseUrl: 'http://localhost/api/auth',
    //  baseUrl: 'http://vastu-api.tudip.com/api/auth',
    // base url server
   // baseUrl: 'http://45.79.103.182:3026/',
    apiKey: 'd71a0600eb536f75c2d6de65f18628b5'
};
