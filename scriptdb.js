// Function to load the corresponding links based on the selected category
function loadLinks(category) {
    const linksSection = document.getElementById('links-section');
    
    // Define the links based on the category selected
    let links = [];

    if (category === 'music-therapy') {
        links = [
            { name: 'Healing Sounds', url: 'https://youtu.be/YRJ6xoiRcpQ?si=7NNjcTv_3_BWRM4l' },
            { name: 'Music for Relaxation', url: 'https://youtu.be/fneClqGElPI?si=JLWqhSPahQMiNfCv' },
            { name: 'Music for Relaxation', url: 'https://youtu.be/HaS5gYuxW-g?si=djlNU0UqAPzr_iwK' },
            { name: 'Therapeutic Playlists', url: 'https://youtu.be/eeG9dhfPzW8?si=m1jTglyj7m-AKEbp' }
        ];
    } else if (category === 'motivation') {
        links = [
            { name: 'Motivational Speeches', url: 'https://youtu.be/sm0i1Y4g_zA?si=Vwbv7Eg87G1uDu6L' },
            { name: 'Inspiring Quotes', url: 'https://youtu.be/godVDNVWeso?si=ZqlksBQ8i9kkcLjH' },
            { name: 'Success Stories', url: 'https://youtu.be/NtVp678qtts?si=Iwy_r-qndmxxZi75' },
            { name: 'Motivational Speeches', url: 'https://youtu.be/MXJYqxTk588?si=phVyfUJqtb6nMBjr' }
        ];
    } else if (category === 'books') {
        links = [
            { name: 'Self-Help Books', url: 'https://www.matrubharti.com/novels/best-novels/english' },
            { name: 'Motivational Reads', url: 'https://pdfdrive.com.co/category/novels' },
            { name: 'Inspirational Biographies', url: 'https://www.scribd.com/doc/17467563/Novel-Links' }
        ];
    } else if (category === 'games') {
        links = [
            { name: 'Brain-Teasers', url: 'https://play.google.com/store/apps/details?id=com.unicostudio.braintest' },
            { name: 'Puzzle Games', url: 'https://play.google.com/store/apps/details?id=com.easybrain.crossword.puzzles' },
            { name: 'Riddles Collection', url: 'https://play.google.com/store/apps/details?id=com.knowledgequizgames.justriddles' }

        ];
    } else if (category === 'Calm Dreamscape') {
        links = [
            { name: 'Slumber', url: 'https:https://youtu.be/qszWwU55iKI?si=QBWX4tAbDkrBKD_g ' },
            { name: 'Rest', url: 'https://youtu.be/qszWwU55iKI?si=RrbOHy2q1PB8LEOy' },
            { name: 'Sleepy', url: 'https://youtu.be/dFhpaoKweDM?si=OnWd2niygn9zOmac' }
        ];
    }

    // Create the HTML for the links
    const linksHTML = links.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`).join('');

    // Insert the links and display the section
    linksSection.innerHTML = linksHTML;
    linksSection.style.display = 'block';
}
