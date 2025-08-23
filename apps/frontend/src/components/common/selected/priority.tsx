import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SelectPriority({
    selected,
    onChange,
}: {
    selected: string;
    onChange: (value: string) => void;
}) {
    return (
        <Select value={selected} onValueChange={onChange}>
            <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue defaultValue={selected} placeholder={selected ? selected : "Default"} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem className="cursor-pointer" value="default">Default</SelectItem>
                    <SelectItem className="cursor-pointer" value="high">High</SelectItem>
                    <SelectItem className="cursor-pointer" value="medium">Medium</SelectItem>
                    <SelectItem className="cursor-pointer" value="low">Low</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
