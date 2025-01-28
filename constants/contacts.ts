export interface Contact {
    id: string;
    name: string;
    phone: string;
  }
  
  export const contactsData: Contact[] = [
    { id: '1', name: 'Test1', phone: '9999999999' },
    { id: '2', name: 'Test2', phone: '9999999998' },
    { id: '3', name: 'ATest3', phone: '9999999997' },
    { id: '4', name: 'BTest4', phone: '9999999996' },
    { id: '5', name: 'CTest5', phone: '9999999995' },
    { id: '6', name: 'DTest6', phone: '9999999994' },
    { id: '7', name: 'ETest7', phone: '9999999993' },
    { id: '8', name: 'FTest8', phone: '9999999992' },
    { id: '9', name: 'GTest9', phone: '9999999991' },
    { id: '10', name: 'HTest10', phone: '9999999990' },
    { id: '11', name: 'ITest11', phone: '9999999981' },
    { id: '12', name: 'JTest12', phone: '9999999982' },
    { id: '13', name: 'KTest13', phone: '9999999983' },
    { id: '14', name: 'LTest14', phone: '9999999984' },
    { id: '15', name: 'MTest15', phone: '9999999985' },
    { id: '16', name: 'NTest16', phone: '9999999986' },
    { id: '17', name: 'OTest17', phone: '9999999987' },
    { id: '18', name: 'PTest18', phone: '9999999988' },
    { id: '19', name: 'QTest19', phone: '9999999989' },
    { id: '20', name: 'RTest20', phone: '9999999980' },
  ];
  
  export const fetchContacts = (page: number, limit: number): Promise<Contact[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = contactsData.slice(startIndex, endIndex);
        resolve(paginatedData);
      }, 1000); // Simulate network delay
    });
  };