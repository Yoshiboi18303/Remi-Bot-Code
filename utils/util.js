function status() {
    let status = [
        `Undergoing Maintenance | Stay Tuned <3`,
        `Undergoing Rewrite | <3`
    ];

    let index = Math.floor(Math.random() * (status.length - 1) + 1);
    client.user.setActivity(status[index]);
}

module.exports = {
    status,
    fearIcon
}
