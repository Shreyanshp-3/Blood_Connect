export const completeProfile = async (req, res) => {

    const { name, dateOfBirth, bloodGroup, location } = req.body;
    // console.log(req.body);
    if (!name || !dateOfBirth || !bloodGroup || !location) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // update logged in user's profile(from auth middleware )
    req.user.name = name;
    req.user.dateOfBirth = dateOfBirth;
    req.user.bloodGroup = bloodGroup;
    req.user.location = location;
    req.user.isProfileComplete = true;
    req.user.isDonorActive = false; // sdefault off for safety

    await req.user.save();

    res.json({
        message: "Profile completed successfully",
        isProfileComplete: true
    });
};


export const getMe = async (req, res) => {

    const user = req.user;
    res.json({
        name: user.name,
        bloodGroup: user.bloodGroup,
        dateOfBirth: user.dateOfBirth,
        location: user.location,
        isDonorActive: user.isDonorActive,
        stats: {
            donations: user.totalDonations || 0,
            requests: user.totalRequests || 0
        }
    });
};



export const updateDonorStatus = async (req, res) => {

    const { isDonorActive } = req.body;

    if (typeof isDonorActive !== 'boolean') {
        return res.status(400).json({ message: "isDonorActive must be a boolean" });
    }

    req.user.isDonorActive = isDonorActive;

    await req.user.save();

    res.json({

        message: isDonorActive
            ? "You are now visible to nearby people in need"
            : "You are no longer visible on the radar",
        isDonorActive
    });
};