"use client"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useCallback, useEffect, useState} from "react";
import {Separator} from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import {MessagePayloadForm} from "@/lib/types/toast.type";
import ToastInitialisation from "@/lib/preprocessors/toast-initialisation";
import useAuthStore from "@/lib/store/user.modal";

type ContactInfo = {
    id?: number;
    name?: string;
    address?: string;
    website?: string;
    phone?: string;
    email?: string;
}

type BankInfo = {
    id?: number;
    contactId?: number;
    bankName?: string;
    bankAccount?: string;
}

export default function Component() {
    const router = useRouter();
    const [formData, setFormData] = useState<ContactInfo>({})
    const [bankAccountFormData, setBankAccountFormData] = useState<BankInfo>({})
    const [contacts, setContacts] = useState<ContactInfo[]>([])

    const getContacts = useCallback(() => {
        axios.get(`${process.env.NEXT_PUBLIC_PREFIX_API}/bitrix/contact?accessToken=${token}`).then(({data}) => {
            setContacts(data.data.map((contact: any) => ({
                id: contact.ID,
                name: contact.NAME,
                address: contact.ADDRESS,
                phone: contact.PHONE?.[0]?.VALUE,
                email: contact.EMAIL?.[0]?.VALUE,
                website: contact.WORK_WEBSITE?.[0]?.VALUE,
            })));
        }).catch((e) => {
            console.error(e);
        })
    },[])
    const [message, setMessage] = useState<MessagePayloadForm>({content: ""});
    const [triggerNotice, setTriggerNotice] = useState<boolean>(false);

    const {token, getTokenFromLocalStorage} = useAuthStore();

    useEffect(() => {
        getTokenFromLocalStorage();
    }, [getTokenFromLocalStorage]);

    ToastInitialisation({triggerMessage : triggerNotice, message : message})

    useEffect(() => {
        getContacts()
    }, [getContacts]);

    const handleContactSubmit = () => {
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/bitrix/contact?accessToken=${token}`, {...formData}).then(response => {
            setFormData({
                name : "",
                address : "",
                phone : "",
                email : "",
                website : "",
            })
            setMessage({content : "Create Contact Successfully", type : "success"})
            setTriggerNotice(!triggerNotice)
            getContacts()
        }).catch(error => {
            console.error(error)
        })

    }

    const handleBankAccountSubmit = () => {
        axios.post(`${process.env.NEXT_PUBLIC_PREFIX_API}/bitrix/bank-info/${bankAccountFormData.contactId}?accessToken=${token}`, {...bankAccountFormData}).then(response => {
            setBankAccountFormData({
                contactId : undefined,
                bankName : "",
                bankAccount : "",
            })
            setMessage({content : "Create Bank Information Successfully", type : "success"})
            setTriggerNotice(!triggerNotice)
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="space-y-6 w-2/3 mt-10 p-6 rounded-md mx-auto shadow border flex flex-col items-center">
            <Button variant="info" onClick={() => {
                router.push("/method")
            }} className="w-fit">Go to Method</Button>

            <div className="space-y-10 w-full">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Tên </Label>
                        <Input value={formData.name} placeholder="" onChange={(e) => {
                            setFormData((prev) => ({...prev, name: e.target.value}))
                        }}/>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Địa chỉ </Label>
                            <Input placeholder="" value={formData.address} onChange={(e) => {
                                setFormData((prev) => ({...prev, address: e.target.value}))
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input placeholder="" value={formData.website} onChange={(e) => {
                                setFormData((prev) => ({...prev, website: e.target.value}))
                            }}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Số điện thoại</Label>
                            <Input value={formData.phone} placeholder="" onChange={(e) => {
                                setFormData((prev) => ({...prev, phone: e.target.value}))
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={formData.email} placeholder="" onChange={(e) => {
                                setFormData((prev) => ({...prev, email: e.target.value}))
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Button onClick={handleContactSubmit} className="w-fit">Create contact</Button>
                    </div>
                </div>

                <Separator/>

                <div className="space-y-4">
                    <Select value={bankAccountFormData.contactId?.toString() || "0"} onValueChange={(value) => setBankAccountFormData((prev) => ({...prev, contactId: +value}))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Contact"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Contact</SelectLabel>
                                {
                                    contacts?.map((contact, index) => (
                                        <SelectItem key={index}
                                                    value={contact?.id?.toString() || ""}>{contact?.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tên ngân hàng</Label>
                            <Input value={bankAccountFormData.bankName} placeholder="" onChange={(e) => {
                                setBankAccountFormData((prev) => ({...prev, bankName: e.target.value}))
                            }}/>
                        </div>
                        <div className="space-y-2">
                            <Label>Số tài khoản</Label>
                            <Input value={bankAccountFormData.bankAccount} placeholder="" onChange={(e) => {
                                setBankAccountFormData((prev) => ({...prev, bankAccount: e.target.value}))
                            }}/>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <Button className="w-fit" onClick={handleBankAccountSubmit}>Create Bank Information</Button>
                    </div>
                </div>

            </div>


        </div>
    )
}