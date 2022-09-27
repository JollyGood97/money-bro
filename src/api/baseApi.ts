import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import Transaction from '../model/Transaction';
import FixedDeposit from '../model/FixedDeposit';
import Goal from '../model/Goal';

const timestamp = firestore.FieldValue.serverTimestamp();

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['newIncomeExpense', 'newFixedDeposit', 'monthlyGoal'],
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
            // .orderBy('month', 'asc')
            .orderBy('createdAt', 'asc')
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
    getAllUsersIncomeExpense: builder.query<Transaction[], any>({
      providesTags: ['newIncomeExpense'],
      async queryFn() {
        try {
          const accountsData: any = [];
          await firestore()
            .collection('accounts')
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
          await firestore()
            .collection('accounts')
            .add({...data, createdAt: timestamp});
          return {data};
        } catch (error) {
          return {error};
        }
      },
    }),
    getFixedDeposits: builder.query<FixedDeposit[], any>({
      providesTags: ['newFixedDeposit'],
      async queryFn(arg) {
        const {uid} = arg;
        try {
          const fixedDepositsData: any = [];
          await firestore()
            .collection('fixedDeposits')
            .where('uid', '==', uid)
            // .orderBy('month', 'asc')
            // .orderBy('createdAt', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                fixedDepositsData.push({
                  id: documentSnapshot.id,
                  ...documentSnapshot.data(),
                });
              });
            });

          return {data: fixedDepositsData};
        } catch (error) {
          return {error};
        }
      },
    }),
    addFixedDeposit: builder.mutation({
      invalidatesTags: ['newFixedDeposit'],
      async queryFn(data) {
        try {
          await firestore()
            .collection('fixedDeposits')
            .add({...data, createdAt: timestamp});
          return {data};
        } catch (error) {
          return {error};
        }
      },
    }),
    getMonthlyGoal: builder.query<Goal[], any>({
      providesTags: ['monthlyGoal'],
      async queryFn(arg) {
        const {uid} = arg;
        try {
          const monthlyGoalData: any = [];
          await firestore()
            .collection('goals')
            .where('uid', '==', uid)
            // .orderBy('month', 'asc')
            // .orderBy('createdAt', 'asc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                monthlyGoalData.push({
                  id: documentSnapshot.id,
                  ...documentSnapshot.data(),
                });
              });
            });

          return {data: monthlyGoalData};
        } catch (error) {
          return {error};
        }
      },
    }),
    addMonthlyGoal: builder.mutation({
      invalidatesTags: ['monthlyGoal'],
      async queryFn(data) {
        try {
          await firestore()
            .collection('goals')
            .add({...data, createdAt: timestamp});
          return {data};
        } catch (error) {
          return {error};
        }
      },
    }),
  }),
});

export const {
  useGetIncomeExpenseQuery,
  useGetAllUsersIncomeExpenseQuery,
  useAddIncomeExpenseMutation,
  useGetFixedDepositsQuery,
  useAddFixedDepositMutation,
  useAddMonthlyGoalMutation,
  useGetMonthlyGoalQuery,
} = baseApi;
