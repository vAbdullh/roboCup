const fs = require('fs');
const csv = require('csv-parser');

const results = [];
const filePath = 'data.csv'; // or 'data.tsv'
const isTSV = filePath.endsWith('.tsv');

// Function to detect the social media platform
function detectSocialPlatform(value) {
    const v = (value || '').toLowerCase();

    if (v.includes('linkedin.com')) return 'linkedin';
    if (v.includes('twitter.com') || v.includes('x.com')) return 'x';
    return null;
}

// Read and parse the CSV/TSV file
fs.createReadStream(filePath)
    .pipe(csv({ separator: isTSV ? '\t' : ',' }))
    .on('data', (row) => {
        const name = row['Full Name (English)'];
        const department = row['Department'] || 'Unknown';
        const role = row['Role '] || 'Members';
        const email = row['Personal Email'];
        const socialUrl = row['حسابك في X او linkedin'];
        const platform = detectSocialPlatform(socialUrl);  // Detect social media platform

        const member = {
            name,
            email,
            role,
        };

        // If social media URL is detected, add it to the member object
        if (platform) {
            member[platform] = socialUrl;
        }

        // Only add the member if both name and email are present
        if (member.name && member.email) {
            // Find the department group or create a new one if it doesn't exist
            const departmentGroup = results.find(d => d.name === department);

            if (!departmentGroup) {
                results.push({
                    name: department,
                    members: [member],
                });
            } else {
                departmentGroup.members.push(member);
            }
        }
    })
    .on('end', () => {
        console.log("CSV file successfully processed with " + results.length + " departments.");
        console.log("Members in each department: ");
        let ttlMembers = 0;
        results.forEach(dept => {
            console.log(`${dept.name}: ${dept.members.length} members`);
            ttlMembers += dept.members.length;
        });
        console.log("Total members: " + ttlMembers);
        fs.writeFileSync('output.json', JSON.stringify(results, null, 2));
    });
