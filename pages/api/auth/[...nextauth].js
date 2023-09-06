import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const apiurl = publicRuntimeConfig.factsApiUrl + "Page/getopensection";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.name) token.name = user.name;
      if (user?.email) token.email = user.email;
      if (user?.initials) token.initials=user.initials
      //if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      if (token?.name) session.user.name = token.name;
      if (token?.initials) session.user.initials=token.initials;
      if (token?.email) session.user.email = token.email;
      //  session.user = { _id: token._id, name: token.name, email: token.email };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const resp = await axios.post(
          apiurl,
          {
            containerId: ["login"],
            strEMail: credentials.email,
            strDecryptedPassword: credentials.password,
            strCurrentLoginId: credentials.cartId, //"100b79a2-fec8-4d4e-ad8b-c4cbda81d615",
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if (resp.data[0].data.login.Table.length > 0) {
          const user = resp.data[0].data.login.Table;

          if (user) {
            console.log('here')
            return {
              _id: user[0].OCM_DOCNO,
              name: user[0].OCM_BTO_FIRST_NAME,
              initials:user[0].OCM_BTO_FIRST_NAME[0]+user[0].OCM_BTO_LAST_NAME[0],
              email: user[0].OCM_EMAIL,
              image: "f",
              // isAdmin: user.isAdmin,
            };
            
          } else throw new Error("Invalid email or password");
        } else throw new Error("Invalid email or password ");
      },
    }),
  ],
});

//     if (user?._id) {
//       token._id = user._id;
//       token.name = user.name;
//       token.email = user.email;

//   async session({ session, token }) {
//     if (token?._id) session.user._id = token._id;
//     session.user = { _id: token._id, name: token.name, email: token.email };
//     // if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
//     return session;

//     authorize: async (credentials) => {
//       const resp = await axios.post(
//         apiurl,
//         {
//           containerId: ["login"],
//           strEMail: credentials.email,
//           strDecryptedPassword: credentials.password,
//           strCurrentLoginId: credentials.cartId, //"100b79a2-fec8-4d4e-ad8b-c4cbda81d615",
//         },
//         {
//           headers: {
//             "content-type": "application/json",
//           },
//         }
//       );

//       if (resp.data[0].data.login.Table.length > 0) {
//         // console.log(resp.data);
//         const user = resp.data[0].data.login.Table;

//         if (user) {
//           return {
//             _id: user[0].OCM_DOCNO,
//             name: user[0].OCM_BTO_FIRST_NAME,
//             email: user[0].OCM_EMAIL,
//             image: "f",
//             // isAdmin: user.isAdmin,
//           };
//         } else throw new Error("Invalid email or password");
//         // console.log(resp.data.data.login.Table[0]);
//       } else throw new Error("Invalid email or password ");
//     },
//   }),
// ],
// pages: {
//   signIn: "/login",
//   signOut: "/",
// },
