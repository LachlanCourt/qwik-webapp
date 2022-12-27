import { RequestHandler } from "@builder.io/qwik-city";
import {db} from 'db'
import { verifyToken } from "~/common/authentication/verifyToken";
import NewAccount from "~/pages/account/NewAccountPage";
import { AccountData } from "../[accountId]";

export default NewAccount;