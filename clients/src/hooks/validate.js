
export const validate =(input,copy)=>{
    const titles = copy && copy.map(recipe=>recipe.title).includes(input.title);
    const images = copy && copy.map(recipe=>recipe.image).includes(input.image);

    const newError = {}; 

    const vImage = /^(https?:\/\/)?[\w.-]+(\/\S+)+\.(png|jpe?g|gif|bmp|svg|jpeg;base64)/i;
    const vHealthScore = /^[0-9]/;
    
    if (input.title==='') {
      newError.title="required"
    }else if (input.title.length < 5 || input.title.length > 60) {
      newError.title = "Title must be between 5 and 60 characters";
    } else if (!/^[a-zA-Z]/.test(input.title)) {
      newError.title = "Title must begin with an alphabetic character";
    } else if (!/[a-zA-Z]$/.test(input.title)) {
      newError.title = "Title must end with an alphabetic character";
    } else if (/\s\s/.test(input.title)) {
      newError.title = "The title cannot have two consecutive spaces";
    }else if (titles) {
      newError.title = "The recipe already exists";
    }else {
      newError.title = ""; // Asignar cadena vacía cuando no hay error
    }
     
    if (input.summary==='') {
      newError.summary="required"
    }else if (input.summary.length < 250 || input.summary.length > 1500) {
      newError.summary = "Summary must be between 250 and 500 characters";
    } else if (!/^[a-zA-Z]/.test(input.summary)) {
      newError.summary = "Summary must begin with an alphabetic character";
    } else if (!/[a-zA-Z]$/.test(input.summary)) {
      newError.summary = "Summary must end with an alphabetic character";
    } else if (/\s\s/.test(input.summary)) {
      newError.summary = "The summary cannot have two consecutive spaces";
    }else {
      newError.summary = ""; // Asignar cadena vacía cuando no hay error
    }
  
    if (input.image==='') {
      newError.image="required"
    }else if (!vImage.test(input.image)) {
      newError.image = 'Debe ser una URL válida';
    }else if (images) {
      newError.image = "the image already exists";
    }else {
      newError.image = '';
    }

    if (input.healthScore==='') {
      newError.healthScore="required"
    }else if (!vHealthScore.test(input.healthScore)) {
      newError.healthScore = 'Must be a numeric value';
    } else {
      newError.healthScore = '';
    }

    return(newError);
}