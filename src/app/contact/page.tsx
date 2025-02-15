import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function Component() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Tên dự án</Label>
                <Input placeholder="Coming back with NYC"/>
            </div>
            <div className="space-y-2">
                <Label>Mô tả về dự án</Label>
                <Textarea placeholder="Dự án này thực sự rất đáng chú ý mà..."/>
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