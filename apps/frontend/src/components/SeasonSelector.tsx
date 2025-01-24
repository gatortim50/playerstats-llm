import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    options: Array<{ label: string; value: string }>;
    setSeason: (value: number) => void;
}

const SeasonSelector: React.FC<Props> = ({ options, setSeason }) => {
    return (
        <div className="flex justify-end items-center bg-white p-4 shadow rounded-md">
            <Select onValueChange={(value) => setSeason(parseInt(value))}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a season" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Seasons</SelectLabel>
                        <SelectItem value="0">All</SelectItem>
                        {options.map(({ label, value }) =>
                            <SelectItem value={value}>{label}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SeasonSelector;