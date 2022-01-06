import $, { timers } from 'jquery';


class AutoSave{
    runCalled = false;
    autoCalled = false;
    inputs = [];
    list(...refs){
        refs.map((input)=>{
            this.inputs.push(input);
        });
    }
    append(inputRef){
        this.inputs.push(inputRef);
    }
    run(){
        if (this.autoCalled){
            throw new Error("You cannot call this.run() after you call this.auto()");
        }
        this.inputs.map((element, i)=>{
            this.buildAutoSave(element, i);
        });
        this.runCalled = true;
    }
    buildAutoSave(element, i){
        const type = $(element).attr("type");
        const key = window.location.hash + i + type;
        const value = window.localStorage.getItem(key);
        if(type === "file"){
            return;
        }else if (type === "checkbox"){
            $(element).attr("checked", value).change(()=>{
                window.localStorage.setItem(key, $(element).val());
            });
        }else{
            $(element).val(value).change(()=>{
                window.localStorage.setItem(key, $(element).val());
            });
        }
    }
    auto(){
        if (this.runCalled){
            throw new Error("You cannot call this.auto() after you call this.run()");
        }
        //window.localStorage.clear();
        $("body").find("input, select").each((i, element)=>{
            this.buildAutoSave(element, i);
        });
        this.autoCalled = true;
    }
}

export const autoSave = new AutoSave();