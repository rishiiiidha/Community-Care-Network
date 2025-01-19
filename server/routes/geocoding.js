// routes/geocoding.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

/**
 * GET /api/geocode
 * Query Parameters:
 * - address: The location address to geocode
 * Returns latitude and longitude for the given address
 */
router.get("/geocode", async (req, res) => {
	try {
		const { address } = req.query;

		if (!address) {
			return res.status(400).json({
				success: false,
				error: "Address is required",
			});
		}

		const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

		if (!MAPBOX_ACCESS_TOKEN) {
			return res.status(500).json({
				success: false,
				error: "Mapbox access token not configured",
			});
		}

		// Encode the address for URL
		const encodedAddress = encodeURIComponent(address);

		// Make request to Mapbox Geocoding API
		const response = await axios.get(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
		);

		if (!response.data.features || response.data.features.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Location not found",
			});
		}

		// Get the first result
		const [longitude, latitude] = response.data.features[0].center;
		const placeName = response.data.features[0].place_name;

		return res.json({
			success: true,
			data: {
				latitude,
				longitude,
				placeName,
				
			},
		});
	} catch (error) {
		console.error("Geocoding error:", error.response?.data || error.message);

		return res.status(500).json({
			success: false,
			error: "Error getting location coordinates",
		});
	}
});

module.exports = router;