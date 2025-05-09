# Start from Debian image
FROM ubuntu:22.04 

# Install base packages and tools needed for Neovim plugins and Zsh
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
  nodejs \
  npm \
  zsh \
  && apt-get clean

# Set up locales
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen

# Install Homebrew
RUN git clone https://github.com/Homebrew/brew /home/linuxbrew/.linuxbrew/Homebrew && \
  mkdir /home/linuxbrew/.linuxbrew/bin && \
  ln -s /home/linuxbrew/.linuxbrew/Homebrew/bin/brew /home/linuxbrew/.linuxbrew/bin/brew

# Add brew to PATH
ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
ENV HOMEBREW_NO_ANALYTICS=1

# Install Neovim via brew (latest version)
RUN brew install neovim

# Clone your Neovim config (assuming you have it on GitHub)
RUN git clone https://github.com/MatsVingerhoets/nvim.git /root/.config/nvim

# Clone dotfiles and copy the zshrc file
RUN git clone https://github.com/MatsVingerhoets/dotfiles.git /root/dotfiles
RUN cp /root/dotfiles/zshrc /root/.zshrc

# Install FiraCode Nerd Font
RUN curl -LO https://github.com/ryanoasis/nerd-fonts/releases/download/v2.3.3/FiraCode.zip && \
  unzip FiraCode.zip -d /usr/share/fonts && \
  fc-cache -fv && \
  rm FiraCode.zip

# Set Zsh as the default shell
RUN chsh -s /bin/zsh root  # Make Zsh the default shell

# Set working directory
WORKDIR /workspace
