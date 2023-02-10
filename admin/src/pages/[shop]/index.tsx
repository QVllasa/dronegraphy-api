import ShopLayout from '@/components/layouts/shop';
import Loader from '@/components/ui/loader/loader';
import {adminOwnerAndStaffOnly, getAuthCredentials,} from '@/utils/auth-utils';
import {useTranslation} from 'next-i18next';
import {useMeQuery} from "@/data/user";
import {useMutation} from "react-query";
import {shopClient} from "@/data/client/shop";
import {useState} from "react";
import {Shop} from "@/types";

export default function ShopPage() {
    const {t} = useTranslation();
    const {permissions} = getAuthCredentials();
    const [shop, setShop] = useState<Shop>()
    const {data, isLoading: isLoadingUser, error: errorUser} = useMeQuery()

    const {mutate: loadShop, isLoading: loading, error,} = useMutation(shopClient.get, {
        onSuccess: (shop) => {
            setShop(shop)
        },
        onError: () => {
        }
    });

    if (data && !isLoadingUser && !shop) {
        console.log("me: ", data);
        // loadShop({id: me?.shop?._id})
    } else {

    }

    if (loading) return <Loader text={t('common:text-loading')}/>;


    return (
        <div className="grid grid-cols-12 gap-6">

        </div>
    );
}
ShopPage.Layout = ShopLayout;
ShopPage.authenticate = {
    permissions: adminOwnerAndStaffOnly,
};

