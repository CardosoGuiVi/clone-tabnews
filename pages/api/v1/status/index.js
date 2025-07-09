function status(request, response) {
  response.status(200).json({ vasco: "campeão" });
}

export default status;
