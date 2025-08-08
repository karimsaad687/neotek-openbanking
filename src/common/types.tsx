export type NeotekTheme = {
  themeMain: {
    primaryColor: '#0CBAB7';
    primaryButtonTextColor: '#ffffff';
    secondaryColor: '#D8ECEB';
    secondaryButtonTextColor: '#0CBAB4';
    textPrimaryColor: '#000000';
    textSecondaryColor: '#72788E';
    white: '#fff';
    gray: '#F7F8FA';
  };
  fontMain: {
    regular: 'sfprodisplayregular';
    bold: 'sfprodisplaybold';
    medium: 'sfprodisplaymedium';
    semi: 'sfprodisplaysemibold';
  };
};

export type Account = {
  Nickname: string;
  AccountId: string;
};

export type FinancialInstitution = {
  NameEn: string;
  NameAr: string;
  Logo: any;
  FinancialInstitutionName: string;
};

export type AccountLink = {
  Accounts: { Account: Account[] };
  FinancialInstitution: FinancialInstitution;
  Status: string;
  CreationDateTime: string;
  AccountsLinkId: string;
  accounts: Account[];
  FinancialInstitutionId: string;
};
