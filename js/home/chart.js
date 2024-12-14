
//comparion--------------------------------------------------- 
// Bar Chart for Attributes// Bar Chart for JDM vs Other Cars
// Bar Chart for Attributes
// Bar Chart for Attributes
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Reliability', 'Cost', 'Speed', 'Customization', 'Design'],
        datasets: [
            {
                label: 'JDM Cars',
                data: [9, 7, 8, 10, 9],
                backgroundColor: 'rgba(234, 21, 56, 0.8)',
                borderColor: 'rgba(234, 21, 56, 1)',
                borderWidth: 1
            },
            {
                label: 'Other Cars',
                data: [7, 9, 8.5, 7, 6.6],
                backgroundColor: 'rgba(34, 202, 236, 0.8)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        scales: {
            y: { beginAtZero: true }
        },
        animation: {
            duration: 5000, // decrease the duration (in ms) to speed up the animation
            easing: 'easeOutQuart' // specify an easing function for smooth animation
        }
    }
});

// Line Chart for Demand & Community
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ['2010', '2015', '2020', '2024'],
        datasets: [
            {
                label: 'JDM Demand',
                data: [50, 75, 90, 120],
                borderColor: 'rgba(234, 21, 56, 1)',
                backgroundColor: 'rgba(234, 21, 56, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Community Growth',
                data: [30, 60, 80, 100],
                borderColor: 'rgba(34, 202, 236, 1)',
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        },
        animation: {
            duration: 5000, // decrease the duration (in ms) to speed up the animation
            easing: 'easeOutQuart' // specify an easing function for smooth animation
        }
    }
});
