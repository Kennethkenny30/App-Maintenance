"use client"

import { 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormFieldType } from "../forms/FormulaireDeConnexion";
import Image from 'next/image';
import { Textarea } from "./textarea";
//import { Checkbox } from "@/components/ui/checkbox";


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?:boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode,
    options?: string[],  // Added options prop for SELECT fields
    onChange?: (value: string) => void,  // Added onChange prop for chained select
}

const RenderField = ({field, props}: { field:  any; props: CustomProps}) =>{
    const { fieldType, iconSrc, iconAlt, placeholder, options, onChange  } = props;

    switch(fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="ml-1 mr-1"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shadinput border-0"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.PASSWORD_INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="ml-1 mr-1"
                        />
                    )}
                    <FormControl>
                        <Input
                            type="password"
                            placeholder={placeholder}
                            {...field}
                            className="input-password shadinput border-0"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                <Textarea
                    placeholder={placeholder}
                    {...field}
                    className="shad-textArea"
                    disabled={props.disabled}
                />
                </FormControl>
            );

        case FormFieldType.SELECT:
        case FormFieldType.SELECT1:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || 'icon'}
                            className="ml-1 mr-1"
                        />
                    )}
        
                    <FormControl>
                        {fieldType === FormFieldType.SELECT ? (
                            <select
                                {...field}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    field.onChange(selectedValue);
                                    if (onChange) {
                                        onChange(selectedValue);  // Gestion pour les selects enchaînés
                                    }
                                }}
                                className="shad-select-trigger"
                            >
                                <option value="" disabled>{placeholder}</option>
                                {options?.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="shad-select-trigger">
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="shad-select-content">
                                    {props.children}
                                </SelectContent>
                            </Select>
                        )}
                    </FormControl>
                </div>
            );

        /*case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                <div className="flex items-center gap-4">
                    <Checkbox
                    id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                    <label htmlFor={props.name} className="checkbox-label">
                    {props.label}
                    </label>
                </div>
                </FormControl>
            );*/
        

        default:
            break;
    };
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;

    return(
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label &&(
                        <FormLabel className="shad-input-label">{label}</FormLabel>
                    ) }

                    <RenderField field={field} props={props}/>

                    <FormMessage className="shad-error" />

                </FormItem>
            )}
        />
    )
}


export default CustomFormField
