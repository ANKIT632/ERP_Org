import React ,{useState}from "react";
import axios from "axios";
export default function FindBranch() {
  const [ifscCode, setIFSCCode] = useState("");
  const [branchDetails, setBranchDetails] = useState(null);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
      setBranchDetails(response.data);
      setError("");
    } catch (error) {
      setBranchDetails(null);
      setError("Error fetching branch details");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ifscCode}
            onChange={(e) => setIFSCCode(e.target.value)}
            placeholder="Enter IFSC code"
          />
          <button type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
        {branchDetails && (
        <div>
        <h2>Branch Details</h2>
        <p>IFSC: {branchDetails.IFSC}</p>
        <p>MICR: {branchDetails.MICR}</p>
        <p>Bank: {branchDetails.BANK}</p>
        <p>Address: {branchDetails.ADDRESS}</p>
        <p>State: {branchDetails.STATE}</p>
        <p>Contact: {branchDetails.CONTACT}</p>
        <p>Name: {branchDetails.BRANCH}</p>
        <p>City: {branchDetails.CITY}</p>
      </div>
        )}
      </div>
    </>
  );
}
