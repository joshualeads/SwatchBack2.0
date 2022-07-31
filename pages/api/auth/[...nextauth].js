import NextAuth from "next-auth";
import Providers from "next-auth/providers/google";

const options = {
    providers: [
        Providers({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        session: async (session, user) => {
            console.log('---- Session -----');
            console.log(session);
            console.log('---- UserSession -----');
            console.log(user);
            if(user){
                session.jwt = user.jwt;
                session.id = user.id;
            }
            return Promise.resolve(session);
        },
        jwt: async ({token, user, account}) => {
            console.log('---- Token -----');
            console.log(token);
            console.log('---- User -----');
            console.log(user);
            console.log('---- Account -----');
            console.log(account);
            const isSignIn = user ? true : false;
            console.log(`Is SignedIn: ${isSignIn}`);
            if (isSignIn) {
                console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.access_token}`
                );
                const data = await response.json();
                console.log('--- Data ---');
                console.log(data);
                token.jwt = data.jwt;
                token.id = data.user.id;
            }
            return Promise.resolve(token);
        },
        redirect: async (url, _baseUrl) => {
            if (url === '/login' || url === '/register') {
              return Promise.resolve('/');
            }
            return Promise.resolve('/');
          },
    },
};

const Auth = (req, res) =>
    NextAuth(req, res, options);

export default Auth;