class Validators {
    validateEmail(email:string){
        return /.+@.+\.[A-Za-z]+$/.test(email);
    }
}
export default Validators;