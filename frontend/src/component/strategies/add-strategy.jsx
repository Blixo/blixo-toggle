import React, { PropTypes } from 'react';

import { Textfield, IconButton } from 'react-mdl';
import { HeaderTitle, FormButtons } from '../common';


const trim = (value) => {
    if (value && value.trim) {
        return value.trim();
    } else {
        return value;
    }
};

function gerArrayWithEntries (num) {
    return Array.from(Array(num));
}
export const PARAM_PREFIX = 'param_';
export const TYPE_PREFIX = 'type_';

const genParams = (input, num = 0, setValue) => (<div>{gerArrayWithEntries(num).map((v, i) => {
    const key = `${PARAM_PREFIX}${i + 1}`;
    const typeKey = `${TYPE_PREFIX}${i + 1}`;
    return (
        <div key={key}>
            <Textfield
                style={{ width: '50%' }}
                floatingLabel
                label={`Parameter name ${i + 1}`}
                name={key}
                onChange={({ target }) => setValue(key, target.value)}
                value={input[key]} />
            <Textfield
                style={{ width: '50%' }}
                floatingLabel
                label={`Type ${i + 1}`}
                name={typeKey}
                onChange={({ target }) => setValue(typeKey, target.value)}
                value={input[typeKey]} />

        </div>
    );
})}</div>);

const AddStrategy = ({
    input,
    setValue,
    incValue,
    // clear,
    onCancel,
    onSubmit,
}) => (
    <form onSubmit={onSubmit(input)}>
        <HeaderTitle title="Create new strategy" subtitle="It is not possible to edit a strategy after it is created."/>
        <section style={{ margin: '16px 20px' }}>
            <Textfield label="Strategy name"
                floatingLabel
                name="name"
                required
                pattern="^[0-9a-zA-Z\.\-]+$"
                onChange={({ target }) => setValue('name', trim(target.value))}
                value={input.name}
                />
            <br />
            <Textfield
                floatingLabel
                style={{ width: '100%' }}
                rows={2}
                label="Description"
                name="description"
                onChange={({ target }) => setValue('description', target.value)}
                value={input.description}
                />
        </section>

        <section style={{ margin: '0 20px' }}>
            {genParams(input, input._params, setValue)}
            <IconButton raised name="add" title="Add parameter" onClick={(e) => {
                e.preventDefault();
                incValue('_params');
            }}/> &nsbp;Add parameter
        </section>

        <br />
        <hr />

        <FormButtons
            onCancel={onCancel}
        />
    </form>
);

AddStrategy.propTypes = {
    input: PropTypes.object,
    setValue: PropTypes.func,
    incValue: PropTypes.func,
    clear: PropTypes.func,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default AddStrategy;
