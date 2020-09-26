import {dedupExchange, ssrExchange, fetchExchange} from "@urql/core";
import {cacheExchange} from "@urql/exchange-graphcache";
import {LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation} from "../generated/graphql";

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include",
    },
    exchanges: [dedupExchange, cacheExchange({
        updates: {
            Mutation: {
                logout: (_result, args, cache) => {
                    betterUpdateQuery<LogoutMutation, MeQuery>(
                        cache,
                        { query: MeDocument },
                        _result,
                        () => ({ me: null })
                    );
                },
                login: (_result, args, cache) => {
                    betterUpdateQuery<LoginMutation, MeQuery>(
                        cache,
                        {query: MeDocument},
                        _result,
                        (result, query) => {
                            if (result.login.errors) {
                                return query;
                            }  else {
                                return {
                                    me: result.login.user,
                                }
                            }
                        }
                    )
                },
                register: (_result, args, cache) => {
                    betterUpdateQuery<RegisterMutation, MeQuery>(
                        cache,
                        {query: MeDocument},
                        _result,
                        (result, query) => {
                            if (result.register.errors) {
                                return query;
                            }  else {
                                return {
                                    me: result.register.user,
                                }
                            }
                        }
                    )
                }
            }
        }
    }),
    ssrExchange,
    fetchExchange
    ],
} as const);