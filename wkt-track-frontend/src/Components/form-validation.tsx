const required = (value: String) => {
  if(!value)
  {
    return (
      <div>This field is required</div>
    );
  }
};

export default required;