import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getIncomeExpense: builder.query({
      async queryFn(arg) {
        const {uid} = arg;
        try {
          const accountsData: any = [];
          await firestore()
            .collection('accounts')
            .where('uid', '==', uid)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                accountsData.push({
                  id: documentSnapshot.id,
                  ...documentSnapshot.data(),
                });
              });
            });

          return {data: accountsData || {}};
        } catch (error) {
          return {error};
        }
      },
    }),
    addIncomeExpense: builder.mutation({
      async queryFn(data) {
        try {
          await firestore().collection('accounts').add(data);
          return {data};
        } catch (error) {
          return {error};
        }
      },
    }),
  }),
});

export const {useGetIncomeExpenseQuery, useAddIncomeExpenseMutation} = baseApi;
