import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const csvFilePath = path.join(process.cwd(), 'public', 'keypoints.csv');

  if (req.method === 'POST') {
    try {
      const csvData = req.body.csvData;
      fs.writeFileSync(csvFilePath, csvData);
      res.status(200).json({ message: 'CSV saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save CSV.' });
    }
  } else if (req.method === 'GET') {
    try {
      const csvData = fs.readFileSync(csvFilePath, 'utf-8');
      res.setHeader('Content-Type', 'text/csv');
      res.status(200).send(csvData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch CSV.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
};