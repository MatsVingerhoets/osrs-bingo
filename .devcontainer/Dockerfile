FROM ubuntu:22.04 
ENV IN_DOCKER=1
ENV DEBIAN_FRONTEND=noninteractive

# Install base packages
RUN apt-get update && apt-get install -y \
  build-essential \
  curl \
  file \
  git \
  sudo \
  locales \
  ripgrep \
  fd-find \
  unzip \
  gcc \
  g++ \
  make \
  python3 \
  python3-pip \
  zsh \
  gnupg \
  lsb-release \
  fontconfig \
  && apt-get clean

# Set up locales
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen

# Remove npm and conflicting Node.js 12 packages (important!)
RUN apt-get remove -y nodejs libnode-dev npm || true

# Add NodeSource repo and install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
  apt-get update && \
  apt-get install -y nodejs

# Install Homebrew
RUN git clone https://github.com/Homebrew/brew /home/linuxbrew/.linuxbrew/Homebrew && \
  mkdir -p /home/linuxbrew/.linuxbrew/bin && \
  ln -s /home/linuxbrew/.linuxbrew/Homebrew/bin/brew /home/linuxbrew/.linuxbrew/bin/brew

ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
ENV HOMEBREW_NO_ANALYTICS=1

# Install Neovim via brew
RUN brew install neovim

# Install fzf
RUN git clone --depth 1 https://github.com/junegunn/fzf.git /opt/fzf && \
  /opt/fzf/install --all --no-bash --no-fish && \
  ln -s /opt/fzf /root/.fzf

RUN curl -fsSL https://github.com/amacneil/dbmate/releases/latest/download/dbmate-linux-amd64 \
  -o /usr/local/bin/dbmate && \
  chmod +x /usr/local/bin/dbmate

# Install Oh My Zsh and plugin
RUN git clone https://github.com/ohmyzsh/ohmyzsh.git /root/.oh-my-zsh && \
  git clone https://github.com/zsh-users/zsh-autosuggestions.git /root/.oh-my-zsh/custom/plugins/zsh-autosuggestions

# Install FiraCode Nerd Font
RUN curl -LO https://github.com/ryanoasis/nerd-fonts/releases/download/v2.3.3/FiraCode.zip && \
  unzip FiraCode.zip -d /usr/share/fonts && \
  fc-cache -fv && \
  rm FiraCode.zip

COPY . /osrs-bingo-init
COPY .devcontainer/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["zsh"]

EXPOSE 3000