import React, { PureComponent } from 'react';
import { Form, Select } from "antd";

const { Option } = Select;

export default class InputSelect extends PureComponent {
    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e)
        }
    }


    render() {

        return (

            <Form.Item
                name={this.props.name}
                label={this.props.label}
                style={this.props.display ? '' : { display: 'none' }}
                rules={[{
                    required: this.props.required ? true : false,
                    message: this.props.requiredMessage
                }]}
            >
                <Select
                    placeholder={this.props.placeholder}
                    showSearch={this.props.showSearch ? true : false}
                    onSelect={(e) => this.handleChange(e)}
                    onDeselect={(e) => this.handleChange(e)}
                    disabled={this.props.disabled}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    autoComplete="none"
                >
                    {
                        this.props && this.props?.list && this.props.list?.map(data =>
                            <Option value={data._id} key={data.name}>{data.name}</Option>
                        )
                    }
                </Select>
            </Form.Item>


        )
    }
}