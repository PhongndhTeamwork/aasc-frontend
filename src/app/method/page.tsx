"use client"
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import axios from "axios";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useRouter, useSearchParams} from "next/navigation";
import useAuthStore from "@/lib/store/user.modal";



export default function Component() {
    const [methods, getAllMethods] = useState<string[]>([]);
    const router = useRouter();
    const {token, getTokenFromLocalStorage, setToken} = useAuthStore();
    const searchParam = useSearchParams()
    useEffect(() => {
        const tokenParam = searchParam.get("accessToken");
        setToken(tokenParam || "")
    }, [searchParam, setToken]);

    useEffect(() => {
        getTokenFromLocalStorage();
    }, []);

    const handleGetAllMethods = () => {
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/bitrix/methods?accessToken=${token}`).then(({data}) => {
            // console.log(data.data);
            getAllMethods(data.data);
        }).catch((e) => {
            console.error(e);
        })
    }
    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="space-x-4">
                <Button onClick={handleGetAllMethods} className="w-fit">Get All Available Methods</Button>
                <Button variant="info" onClick={() => {
                    router.push("/contact")
                }} className="w-fit">Go to Contact</Button>
            </div>

            <div className="space-y-4 w-4/5 h-[80%] mt-10 p-6 rounded-md mx-auto shadow border">
                <ScrollArea className="h-full px-4">
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        {
                            methods.map((method, index) => (
                                <Badge key={index} variant="outline">{method}</Badge>
                            ))
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}