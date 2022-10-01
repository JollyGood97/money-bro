import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import Transaction from '../model/Transaction';
import FixedDeposit from '../model/FixedDeposit';
import Goal from '../model/Goal';
import User from '../model/User';

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
    getAllUsers: builder.query<User[], any>({
      async queryFn() {
        try {
          const usersData: any = [];
          await firestore()
            .collection('users')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                usersData.push({
                  id: documentSnapshot.id,
                  ...documentSnapshot.data(),
                });
              });
            });

          return {data: usersData};
        } catch (error) {
          return {error};
        }
      },
    }),
    enableLeaderboard: builder.mutation({
      async queryFn(data) {
        try {
          await firestore()
            .collection('users')
            .doc(data.uid)
            .update({leaderboardEnabled: data.leaderboardEnabled});
          return {data};
        } catch (error) {
          return {error};
        }
      },
    }),
    changeCurrency: builder.mutation({
      async queryFn(data) {
        try {
          await firestore()
            .collection('users')
            .doc(data.uid)
            .update({currency: data.currency});
          return {data};
        } catch (error) {
          return {error};
        }
      },
    }),
    changeUsername: builder.mutation({
      async queryFn(data) {
        try {
          await firestore()
            .collection('users')
            .doc(data.uid)
            .update({username: data.username});
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
  useGetAllUsersQuery,
  useEnableLeaderboardMutation,
  useChangeUsernameMutation,
  useChangeCurrencyMutation,
} = baseApi;
