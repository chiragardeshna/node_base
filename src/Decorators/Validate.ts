export default function Validate(formRequest: string) {
    return (target) => {
        console.log(target.value);
        target.formRequest = formRequest;
    };
}
