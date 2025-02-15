import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Component() {
    return (
        <div className="space-y-4 w-2/3 mt-10 p-6 rounded-md mx-auto shadow border">
            <div className="space-y-2">
                <Label>Tên dự án</Label>
                <Input placeholder="Coming back with NYC"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Vai trò</Label>
                    <Input placeholder="Người mẫu"/>
                </div>
                <div className="space-y-2">
                    <Label>Công ty</Label>
                    <Input placeholder="ABC Company"/>
                </div>
                <div className="space-y-2">
                    <Label>Chi tiết dự án</Label>
                    <Input placeholder="Link"/>
                </div>
            </div>
        </div>
    )
}