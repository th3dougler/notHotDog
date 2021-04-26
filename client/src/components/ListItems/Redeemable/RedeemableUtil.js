export function ParseData(data, theme) {
  let startDate = new Date(data.activeDate);
  let endDate = new Date(data.expireDate);
  let parsedData = {
    id: data._id,
    businessName: data._node._business.businessName,
    avatar: data._node._business.avatar,
    name: data._node.name,
    description: data._node.description,
    startDate: startDate,
    endDate: endDate,
    primary: (
      <>
        {data._node.name} - {data._node._business.businessName} -{" "}
        {data._node.type.toUpperCase()}
      </>
    ),
  };
  switch (data._node.type) {
    case "gift card":
      parsedData.background = theme.palette.giftcard;
      parsedData.secondary = (
        <>
          {`$${parseFloat(data.contract.remainingValue).toFixed(
            2
          )} / $${parseFloat(data.contract.value).toFixed(2)}`}
          <br />
          Expires:
          {parsedData.endDate.toDateString()}
          <br />
        </>
      );
      break;
    case "ticket":
      parsedData.background = theme.palette.ticket;
      parsedData.secondary = (
        <>
          <strong>Start date:</strong>
          {parsedData.startDate.toDateString()} @
          {parsedData.startDate.toLocaleTimeString("en-us")}
          <br />
          <strong>End date:</strong>
          {parsedData.endDate.toDateString()} @
          {parsedData.endDate.toLocaleTimeString("en-us")}
          <br />
        </>
      );
      break;
    case "coupon":
      parsedData.background = theme.palette.coupon;

      if (data.contract.unit === "percent") {
        parsedData.secondary = (
          <>
            Start date:
            {parsedData.startDate.toDateString()}
            <br />
            End date:
            {parsedData.endDate.toDateString()}
            <br />
          </>
        );
      } else {
        parsedData.secondary = (
          <>
            ${parseFloat(data.contract.value).toFixed(2)} Off
            <br />
            <strong>Activated:</strong>
            {parsedData.startDate.toDateString()}
            <br />
            <strong>Expires:</strong>
            {parsedData.endDate.toDateString()}
            <br />
          </>
        );
      }
      break;
    default:
      parsedData.background = theme.palette.error;
      parsedData.secondary = (
        <>
          <strong>Activated:</strong>
          {parsedData.startDate.toDateString()} @ [
          {parsedData.startDate.toLocaleTimeString("en-us")}]
          <br />
          <strong>Expires:</strong>
          {parsedData.endDate.toDateString()} @ [
          {parsedData.endDate.toLocaleTimeString("en-us")}]
          <br />
        </>
      );
      break;
  }
  return parsedData;
}
