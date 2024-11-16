// Mock dos dados iniciais dos posts
const initialPosts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/600/400?random=${i + 1}`, // URL mockada para imagens
    comments: [] // Lista de comentários vazia para cada post
}));

// Função para carregar posts do localStorage ou usar os dados iniciais
function loadPosts() {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    return savedPosts || initialPosts;
}

// Função para salvar os posts no localStorage
function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Função para renderizar o feed de posts
function renderFeed(posts) {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Limpa o feed antes de renderizar

    posts.forEach(post => {
        // Criação do container de cada post
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Adiciona a imagem do post
        const img = document.createElement('img');
        img.src = post.imageUrl;
        postElement.appendChild(img);

        // Criação da seção de comentários
        const commentsSection = document.createElement('div');
        commentsSection.classList.add('comments');

        // Título de comentários
        const commentsTitle = document.createElement('h4');
        commentsTitle.textContent = 'Comentários';
        commentsSection.appendChild(commentsTitle);

        // Lista de comentários
        post.comments.forEach(comment => {
            const commentText = document.createElement('p');
            commentText.classList.add('comment');
            commentText.textContent = comment;
            commentsSection.appendChild(commentText);
        });

        // Input para adicionar novo comentário
        const commentInput = document.createElement('div');
        commentInput.classList.add('comment-input');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Escreva um comentário...';

        const button = document.createElement('button');
        button.textContent = 'Comentar';

        // Evento de clique para adicionar comentário
        button.addEventListener('click', () => {
            if (input.value.trim() !== '') {
                post.comments.push(input.value.trim()); // Adiciona o comentário ao array do post
                savePosts(posts); // Salva no localStorage
                renderFeed(posts); // Re-renderiza o feed
            }
            input.value = ''; // Limpa o campo de input
        });

        commentInput.appendChild(input);
        commentInput.appendChild(button);
        commentsSection.appendChild(commentInput);

        // Adiciona a seção de comentários ao post
        postElement.appendChild(commentsSection);

        // Adiciona o post ao feed
        feed.appendChild(postElement);
    });
}

// Inicializa o feed ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const posts = loadPosts();
    renderFeed(posts);
});
