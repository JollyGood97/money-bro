import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import Transaction from '../model/Transaction';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['newIncomeExpense'],
  endpoints: builder => ({
    getIncomeExpense: builder.query<Transaction[], any>({
      providesTags: ['newIncomeExpense'],
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

          return {data: accountsData};
        } catch (error) {
          return {error};
        }
      },
    }),
    addIncomeExpense: builder.mutation({
      invalidatesTags: ['newIncomeExpense'],
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