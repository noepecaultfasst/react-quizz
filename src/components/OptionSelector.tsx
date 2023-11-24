import React, {ChangeEvent} from "react";

type Option = {id: number | string, name: string}

interface OptionSelectorProps {
    value?: Option
    id?: string
    defaultLabel: string
    options: Option[]
    onOptionSelected: (optionId: number | string) => void
}

/**
 * Component used to choose among list of options.
 * The options need to meet {@link Option} properties.
 * @param value The currently selected value
 * @param id HTML id of the <select> node.
 * @param options List of potential options
 * @param defaultLabel Text displayed for the placeholder
 * @param onOptionSelected Callback called when a new option is selected
 * @constructor
 */
const OptionSelector = ({value, id, options, defaultLabel, onOptionSelected}: OptionSelectorProps) => {
    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let numberId = Number(e.target.value);
        onOptionSelected(isNaN(numberId) ? e.target.value : numberId)
    };

    return (
        <>
            <select id={id} defaultValue={''} value={value?.id} onChange={onChange}>
                <option disabled value={''}>{defaultLabel}</option>
                {options.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
        </>
    )
};

export default OptionSelector;