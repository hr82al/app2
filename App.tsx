import { Component } from 'react'


document.body.style.display = "flex";


interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string | number;
}

type ValueType = ParamValue['value'];

type Color = string;

interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: {
        paramId: number;
        value: ValueType;
    }[],
}


const params = [
    {
        "id": 1,
        "name": "Назначение",
    },
    {
        "id": 2,
        "name": "Длина"
    }
]

const model: State = {
    "paramValues": [
      {
        "paramId": 1,
        "value": "повседневное"
      },
      {
        "paramId": 2,
        "value": "макси"
      }
    ] 
  }


class ParamEditor extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const tmp: typeof this.state.paramValues = [];
        props.params.map(p => {
            tmp.push({
                paramId: p.id,
                value: p.name,
            })
        });
        this.state = {
            paramValues: tmp,
        };
    }

    public getModel(): Model {
        return {
            ...this.props.model,
            paramValues: this.state.paramValues,
        };
    }

    getValueById(id: number): ValueType {
        return this.state.paramValues.find(p => p.paramId == id)?.value ?? "";
    }

    handleChange(id: number, value: ValueType){
        const newArr = this.state.paramValues.map(p => {
            if (p.paramId === id) {
                return {
                    ...p,
                    value: value
                }
            } else {
                return p;
            }
        });
        this.setState({
            paramValues: newArr,
        });
    }

    render() {
        const items: JSX.Element[] = [];
        this.props.params.map((p) => {
            const labelId = `label-${p.id}`;
            const inputId = `input-${p.id}`;
            items.push( 
                <label key={labelId} htmlFor={inputId}>
                    {p.name}
                </label>
            );
            items.push(
                <input 
                    type='text' 
                    key={inputId}
                    id={inputId} 
                    value={this.getValueById(p.id)} 
                    name={inputId}
                    onChange={e => this.handleChange(p.id, e.target.value)}
                />
            )
        });
        return (
            <div style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                rowGap: "0.5rem",
                columnGap: "2rem",
                border: "1px solid black",
                padding: "1rem 5rem 2rem 2rem",
                textAlign: "center",
                fontFamily: 'Arial, Helvetica, sans-serif',
            }}>
                {items}
            </div>
        )
    }
}


class AppString extends Component {
    params: Param[];
    model: Model;

    constructor(props: {}) {
        super(props);
        this.params = params.map(p => {
            return {
                id: p.id,
                name: p.name,
                type: 'string',
            }
        })
        this.model = {
            paramValues: model.paramValues,
            colors: [],
        }
    }

    render () {
        return (
            <ParamEditor params={this.params} model={this.model}/>
        )
    }
}


export default AppString;
