import React, {Component} from 'react';
import _ from "lodash";
import radioForms from './response.json';

class MainForm extends  Component{

  constructor(props){
    super(props);
    this.state = {
      buttonDisabled:true
    };
  }

  handleFocus(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleButtonEnable(){
      this.setState({
        buttonDisabled:false
      })
  }

  render() {
    let getFirstGroupValue = radioForms.rules[this.state.Group1];
    let getSecondGroupValue = radioForms.rules[this.state.Group2];
    return (
    <>
      <form>
        <h1 className="h3 mb-3 fw-normal">Permissions</h1>
        {/* Extracting all menus */}
        {
          _.map(radioForms.menus,(menu,menuKey) => {
              return (
                <>
                <p className="mt-3">Group {menuKey+1}</p>
                {
                  _.map(menu,({id,value},key) => {
                    if(menuKey===0){
                      {/* Group 1 initially enabled */}
                      return (
                        <div key={key} className="form-group">
                          <label>
                            <input type="radio" 
                            name={'Group'+(menuKey+1)} 
                            disabled={false} 
                            onFocus={(e)=>{this.handleFocus(e)}} 
                            value={id}/> {value}
                          </label>
                        </div>
                      )
                    }else{
                        {/* Other groups initially disabled */}
                        if(getFirstGroupValue!=undefined){
                          return (
                            <>
                              <div className="form-group">
                                <label>
                                  <input type="radio" name={'Group'+(menuKey+1)} 
                                  disabled={
                                    [...getFirstGroupValue,...getSecondGroupValue||''].includes(parseInt(id))
                                  } 
                                  onFocus={(e)=>{this.handleFocus(e);this.handleButtonEnable()}}
                                  value={id}/> {value}
                                </label>
                              </div>
                            </>
                          )
                        }else{
                          return (
                            <>
                              <div key={key} className="form-group">
                                <label>
                                  <input type="radio" name={'Group'+(menuKey+1)} 
                                  disabled={true} 
                                  value={id}/> {value}
                                </label>
                              </div>
                            </>
                          )
                        }
                        
                    }
                  })
                }
                </>
              )
          })
        }
        <button className="btn btn-md btn-primary mt-3" disabled={this.state.buttonDisabled} type="submit">Submit</button>
      </form>
    </>
    )
  };
}

export default MainForm;
