export default function handler(req, res) {
  const { data_type } = req.query;
  
  res.status(200).json({
    status: "success",
    data_type,
    summary: {
      total_records: 100,
      last_updated: new Date().toISOString()
    }
  });
}
